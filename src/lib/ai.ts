import { ChatOpenRouter } from "@langchain/openrouter";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";

const systemPrompt = `You are an expert historical editor and professional technical content formatter.

Your responsibility is to improve historical blog articles while preserving factual accuracy.
Never invent historical facts.
Never change dates, names, locations, or historical events unless correcting obvious grammar mistakes.
Your output must always be clean Markdown.

# Writing Style
Use a professional educational tone.
Write naturally.
Avoid repetitive sentences.
Avoid AI-sounding phrases.
Avoid unnecessary filler.
Prefer active voice.
Keep paragraphs short.

# Markdown Formatting Rules
Always use:
# Title
## Headings
### Subheadings
- Bullet lists
1. Numbered lists
> Blockquotes only for quotations
**Bold for important facts**
Tables only if appropriate
Horizontal rules when separating major sections

# Content Organization
Organize articles into logical sections:
Introduction, Historical Background, Key Events, Important People, Historical Significance, Interesting Facts, Conclusion

# SEO
Generate: SEO Title, Meta Description, URL Slug, Keywords, Reading Time, Category, Tags

# Never
Never invent facts. Never fabricate sources. Never generate citations that were not provided.
Never exaggerate. Never include emojis. Never use clickbait.

# Output Format
Return ONLY valid Markdown. No explanations. No JSON. No HTML. No code blocks. No XML.`;

const FALLBACK_MODELS = [
  "openai/gpt-oss-20b:free",
];

function getApiKey(): string {
  const key = import.meta.env.VITE_OPENROUTER_API_KEY;
  if (!key) throw new Error("OPENROUTER_API_KEY is not set in .env");
  return key;
}

function getModelsToTry(): string[] {
  const preferred = import.meta.env.VITE_OPENROUTER_MODEL;
  const models = [...FALLBACK_MODELS];
  if (preferred && !models.includes(preferred)) {
    models.unshift(preferred);
  }
  return models;
}

function createLLM(model: string) {
  return new ChatOpenRouter({
    apiKey: getApiKey(),
    model,
    temperature: 0.7,
    maxTokens: 4096,
  });
}

function isRateLimitError(error: unknown): boolean {
  if (error instanceof Error) {
    const msg = error.message.toLowerCase();
    return (
      msg.includes("429") ||
      msg.includes("rate limit") ||
      msg.includes("rate-limited") ||
      msg.includes("too many requests")
    );
  }
  return false;
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function invokeWithFallback(
  messages: (SystemMessage | HumanMessage)[]
): Promise<string> {
  const models = getModelsToTry();
  let lastError: unknown = null;

  for (let i = 0; i < models.length; i++) {
    const model = models[i];

    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        const llm = createLLM(model);
        const response = await llm.invoke(messages);

        const content =
          typeof response.content === "string"
            ? response.content
            : JSON.stringify(response.content);

        return content;
      } catch (error) {
        lastError = error;

        if (isRateLimitError(error) && attempt === 0) {
          await delay(2000 * (i + 1));
          continue;
        }

        if (isRateLimitError(error)) {
          break;
        }

        throw error;
      }
    }
  }

  if (lastError instanceof Error) {
    throw new Error(
      `All models are rate-limited. Please wait a moment and try again. Last error: ${lastError.message}`
    );
  }
  throw new Error("All models are currently unavailable. Please try again later.");
}

export async function generateBlogPost(
  userInput: string,
  category: string
): Promise<string> {
  const userMessage = `Write an impressive, well-structured historical blog post about the following topic.

Category: ${category}

User's input/topic:
${userInput.trim()}

Please generate a complete blog post with:
- An engaging title
- Introduction
- Historical Background
- Key Events
- Important People
- Historical Significance
- Interesting Facts
- Conclusion
- SEO metadata (title, meta description, slug, keywords, reading time, tags)

Format everything as clean Markdown.`;

  return invokeWithFallback([
    new SystemMessage(systemPrompt),
    new HumanMessage(userMessage),
  ]);
}

export async function enhancePost(
  rawContent: string,
  category: string
): Promise<string> {
  const message = `Enhance this ${category} blog post. Fix grammar, improve readability, add headings, highlight important facts with bold, and ensure professional quality. Return only clean Markdown.

Original content:
${rawContent}`;

  return invokeWithFallback([
    new SystemMessage(systemPrompt),
    new HumanMessage(message),
  ]);
}

export async function summarizePost(
  content: string,
  category: string
): Promise<string> {
  const message = `Read the following historical blog post and write a clear, easy-to-understand summary.

Category: ${category}

Requirements:
- Write 3 to 5 short paragraphs
- Use plain language anyone can understand
- Highlight the main events, key people, and why it matters
- Use bold for important names and dates
- Keep it concise but informative
- Do NOT repeat the full article
- Return clean Markdown only, no headings

Post content:
${content.substring(0, 6000)}`;

  return invokeWithFallback([
    new SystemMessage(
      "You are a concise summarizer. Given a historical blog post, produce a short, readable summary in plain Markdown. No headings. 3-5 paragraphs. Bold important names and dates."
    ),
    new HumanMessage(message),
  ]);
}
