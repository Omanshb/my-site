export type WritingItem = {
  slug: string;
  entry: string;
  title: string;
  description: string;
  date: string;
  coverImage?: string;
  coverZoomClassName?: string;
  coverDither?: boolean;
};

export function getWritingHref(slug: string) {
  return `/notes/writings/${slug}`;
}

export function getWritingBySlug(slug: string): WritingItem | undefined {
  return WRITINGS.find((item) => item.slug === slug);
}

export type ReadingCategory = "papers" | "books" | "videos" | "blogs";

export type ReadingItem = {
  title: string;
  date?: string;
  author?: string;
  href?: string;
};

export const READING_CATEGORIES: {
  id: ReadingCategory;
  label: string;
}[] = [
  { id: "papers", label: "Papers" },
  { id: "books", label: "Books" },
  { id: "videos", label: "Videos" },
  { id: "blogs", label: "Blogs" },
];

export type ThoughtItem = {
  statement: string;
};

export const WRITINGS: WritingItem[] = [
  {
    slug: "earning-my-goodbyes",
    entry: "Entry 1",
    title: "Earning My Goodbyes",
    description: "Leaving 1804 and Tech",
    date: "05.19.2026",
    coverImage: "/blog_covers/earningmygoodbyes.jpeg",
    coverZoomClassName: "rotate-90 scale-[1.15]",
    coverDither: true,
  },
];

export const READINGS: Record<ReadingCategory, ReadingItem[]> = {
  papers: [
    {
      title: "Attention Is All You Need",
      date: "2017",
      href: "https://arxiv.org/pdf/1706.03762",
    },
    {
      title: "Deep Reinforcement Learning from Human Preferences",
      date: "2017",
      href: "https://arxiv.org/abs/1706.03741",
    },
    {
      title: "Scaling Laws for Neural Language Models",
      date: "2020",
      href: "https://arxiv.org/pdf/2001.08361",
    },
    {
      title: "Language Models are Few-Shot Learners",
      date: "2020",
      href: "https://arxiv.org/pdf/2005.14165",
    },
    {
      title: "Learning to summarize from human feedback",
      date: "2020",
      href: "https://arxiv.org/abs/2009.01325",
    },
    {
      title: "An Image is Worth 16x16 Words: Transformers for Image Recognition at Scale",
      date: "2020",
      href: "https://arxiv.org/abs/2010.11929",
    },
    {
      title: "Training data-efficient image transformers & distillation through attention",
      date: "2021",
      href: "https://arxiv.org/abs/2012.12877",
    },
    {
      title: "Swin Transformer: Hierarchical Vision Transformer using Shifted Windows",
      date: "2021",
      href: "https://arxiv.org/abs/2103.14030",
    },
    {
      title: "DINOv2: Learning Robust Visual Features without Supervision",
      date: "2023",
      href: "https://arxiv.org/abs/2304.07193",
    },
    {
      title: "LoRA: Low-Rank Adaptation of Large Language Models",
      date: "2021",
      href: "https://arxiv.org/abs/2106.09685",
    },
    {
      title: "Training Compute-Optimal Large Language Models",
      date: "2022",
      href: "https://arxiv.org/pdf/2203.15556",
    },
    {
      title: "Training language models to follow instructions with human feedback",
      date: "2022",
      href: "https://arxiv.org/pdf/2203.02155",
    },
    {
      title: "Training a Helpful and Harmless Assistant with Reinforcement Learning from Human Feedback",
      date: "2022",
      href: "https://arxiv.org/abs/2204.05862",
    },
    {
      title: "Constitutional AI: Harmlessness from AI Feedback",
      date: "2022",
      href: "https://arxiv.org/abs/2212.08073",
    },
    {
      title: "Direct Preference Optimization: Your Language Model is Secretly a Reward Model",
      date: "2023",
      href: "https://arxiv.org/pdf/2305.18290",
    },
    {
      title: "Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena",
      date: "2023",
      href: "https://arxiv.org/pdf/2306.05685",
    },
    {
      title: "GQA: Training Generalized Multi-Query Transformer Models from Multi-Head Checkpoints",
      date: "2023",
      href: "https://arxiv.org/abs/2305.13245",
    },
    {
      title: "FlashAttention: Fast and Memory-Efficient Exact Attention with IO-Awareness",
      date: "2022",
      href: "https://arxiv.org/abs/2205.14135",
    },
    {
      title: "FlashAttention-2: Faster Attention with Better Parallelism and Work Partitioning",
      date: "2023",
      href: "https://arxiv.org/abs/2307.08691",
    },
    {
      title: "FlashAttention-3: Fast and Accurate Attention with Asynchrony and Low-precision",
      date: "2024",
      href: "https://arxiv.org/abs/2407.08608",
    },
    {
      title: "Mixtral of Experts",
      date: "2024",
      href: "https://arxiv.org/pdf/2401.04088",
    },
    {
      title: "Mastering Chess and Shogi by Self-Play with a General Reinforcement Learning Algorithm",
      date: "2017",
      href: "https://arxiv.org/pdf/1712.01815",
    },
    {
      title: "Mastering Atari, Go, Chess and Shogi by Planning with a Learned Model",
      date: "2019",
      href: "https://arxiv.org/pdf/1911.08265",
    },
    {
      title: "Chain-of-Thought Prompting Elicits Reasoning in Large Language Models",
      date: "2022",
      href: "https://arxiv.org/pdf/2201.11903",
    },
    {
      title: "Large Language Models are Zero-Shot Reasoners",
      date: "2022",
      href: "https://arxiv.org/abs/2205.11916",
    },
    {
      title: "Self-Consistency Improves Chain of Thought Reasoning in Language Models",
      date: "2023",
      href: "https://arxiv.org/abs/2203.11171",
    },
    {
      title: "Tree of Thoughts: Deliberate Problem Solving with Large Language Models",
      date: "2023",
      href: "https://arxiv.org/pdf/2305.10601",
    },
    {
      title: "Graph of Thoughts: Solving Elaborate Problems with Large Language Models",
      date: "2023",
      href: "https://arxiv.org/pdf/2308.09687",
    },
    {
      title: "Towards System 2 Reasoning in LLMs: Learning How to Think With Meta Chain-of-Thought",
      date: "2025",
      href: "https://arxiv.org/pdf/2501.04682",
    },
    {
      title: "ReAct: Synergizing Reasoning and Acting in Language Models",
      date: "2022",
      href: "https://arxiv.org/pdf/2210.03629",
    },
    {
      title: "DSPy: Compiling Declarative Language Model Calls into Self-Improving Pipelines",
      date: "2023",
      href: "https://arxiv.org/abs/2310.03714",
    },
    {
      title: "Let's Verify Step by Step",
      date: "2023",
      href: "https://arxiv.org/pdf/2305.20050",
    },
    {
      title: "ARC Prize 2024: Technical Report",
      date: "2024",
      href: "https://arxiv.org/pdf/2412.04604",
    },
    {
      title: "DeepSeek-R1: Incentivizing Reasoning Capability in LLMs via Reinforcement Learning",
      date: "2025",
      href: "https://arxiv.org/pdf/2501.12948v1",
    },
    {
      title: "Recursive Language Models",
      date: "2026",
      href: "https://arxiv.org/pdf/2512.24601v1",
    },
    {
      title: "Efficient Memory Management for Large Language Model Serving with PagedAttention",
      date: "2023",
      href: "https://arxiv.org/abs/2309.06180",
    },
    {
      title: "Fast Inference from Transformers via Speculative Decoding",
      date: "2023",
      href: "https://arxiv.org/abs/2211.17192",
    },
    {
      title: "Toolformer: Language Models Can Teach Themselves to Use Tools",
      date: "2023",
      href: "https://arxiv.org/pdf/2302.04761",
    },
    {
      title: "GPT-4 Technical Report",
      date: "2023",
      href: "https://arxiv.org/pdf/2303.08774",
    },
    {
      title: "The Llama 3 Herd of Models",
      date: "2024",
      href: "https://arxiv.org/pdf/2407.21783",
    },
    {
      title: "Gemini 1.5: Unlocking multimodal understanding across millions of tokens of context",
      date: "2024",
      href: "https://arxiv.org/pdf/2403.05530",
    },
    {
      title: "DeepSeek-V2 Technical Report",
      date: "2024",
      href: "https://arxiv.org/abs/2405.04434",
    },
    {
      title: "DeepSeek-V3 Technical Report",
      date: "2024",
      href: "https://arxiv.org/pdf/2412.19437",
    },
    {
      title: "SWE-agent: Agent-Computer Interfaces Enable Automated Software Engineering",
      date: "2024",
      href: "https://arxiv.org/pdf/2405.15793",
    },
    {
      title: "OpenHands: An Open Platform for AI Software Developers as Generalist Agents",
      date: "2024",
      href: "https://arxiv.org/pdf/2407.16741",
    },
    {
      title: "Beyond the Imitation Game: Quantifying and extrapolating the capabilities of language models",
      date: "2022",
      href: "https://arxiv.org/pdf/2206.04615",
    },
    {
      title: "SWE-bench: Can Language Models Resolve Real-World GitHub Issues?",
      date: "2023",
      href: "https://arxiv.org/pdf/2310.06770",
    },
    {
      title: "Chatbot Arena: An Open Platform for Evaluating LLMs by Human Preference",
      date: "2024",
      href: "https://arxiv.org/pdf/2403.04132",
    },
    {
      title: "Steering Language Models With Activation Engineering",
      date: "2023",
      href: "https://arxiv.org/abs/2308.10248",
    },
    {
      title: "Zep: A Temporal Knowledge Graph Architecture for Agent Memory",
      date: "2025",
      href: "https://arxiv.org/abs/2501.13956",
    },
    {
      title: "How to Tame Your LLM: Semantic Collapse in Continuous Systems",
      date: "2025",
      href: "https://arxiv.org/abs/2512.05162",
    },
    {
      title: "Memory in the Age of AI Agents",
      date: "2025",
      href: "https://arxiv.org/abs/2512.13564",
    },
  ],
  books: [
    {
      title: "The Practice: Shipping Creative Work",
      author: "Seth Godin",
      date: "2020",
      href: "https://www.goodreads.com/book/show/53479927-the-practice",
    },
    {
      title: "Good to Great",
      author: "Jim Collins",
      date: "2001",
      href: "https://www.goodreads.com/book/show/76865.Good_to_Great",
    },
    {
      title: "AI Superpowers",
      author: "Kai-Fu Lee",
      date: "2018",
      href: "https://www.goodreads.com/book/show/38242135-ai-superpowers",
    },
    {
      title: "Think Like a Monk",
      author: "Jay Shetty",
      date: "2020",
      href: "https://www.goodreads.com/book/show/51942513-think-like-a-monk",
    },
    {
      title: "The Bhagavad Gita for Daily Living",
      author: "Eknath Easwaran",
      date: "1993",
      href: "https://www.goodreads.com/series/187023-the-bhagavad-gita-for-daily-living",
    },
    {
      title: "Beloved",
      author: "Toni Morrison",
      date: "1987",
      href: "https://www.goodreads.com/book/show/6149.Beloved",
    },
    {
      title: "1984",
      author: "George Orwell",
      date: "1949",
      href: "https://www.goodreads.com/book/show/5470.1984",
    },
    {
      title: "Elon Musk",
      author: "Walter Isaacson",
      date: "2023",
      href: "https://www.goodreads.com/book/show/125277346-elon-musk",
    },
    {
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      date: "1925",
      href: "https://www.goodreads.com/book/show/4671.The_Great_Gatsby",
    },
    {
      title: "An Elegant Defense",
      author: "Matt Richtel",
      date: "2019",
      href: "https://www.goodreads.com/book/show/41806641-an-elegant-defense",
    },
    {
      title: "A Human Algorithm",
      author: "Flynn Coleman",
      date: "2019",
      href: "https://www.goodreads.com/book/show/50902698-a-human-algorithm",
    },
    {
      title: "The Namesake",
      author: "Jhumpa Lahiri",
      date: "2003",
      href: "https://www.goodreads.com/book/show/33917.The_Namesake",
    },
  ],
  videos: [
    {
      title: "Biscuit has the hiccups",
      href: "https://youtu.be/1OF3icemRJc",
    },
    {
      title: "AI can't cross this line and we don't know why.",
      href: "https://youtu.be/5eqRuVp65eY",
    },
    {
      title: "The Calhoun Effect",
      href: "https://youtu.be/LuCans9euxY",
    },
    {
      title: "Can humans make AI any better?",
      href: "https://youtu.be/2hcsmtkSzIw",
    },
    {
      title: "The Dark Matter of AI [Mechanistic Interpretability]",
      href: "https://youtu.be/UGO_Ehywuxc",
    },
    {
      title: "The Geopolitics Of The Mexican Cartels",
      href: "https://youtu.be/Ak85pCY5hqQ",
    },
    {
      title: "What if it actually works out?",
      href: "https://youtu.be/5aR-5cNABAI",
    },
    {
      title: "Stephen Curry's Top 35 Career Plays",
      href: "https://youtu.be/NHhTMh0nURA",
    },
    {
      title: "3 game theory tactics, explained",
      href: "https://youtu.be/PsLaI4jDftA",
    },
    {
      title: "The most complex model we actually understand",
      href: "https://youtu.be/D8GOeCFFby4",
    },
    {
      title: "Neural networks",
      href: "https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi",
    },
    {
      title: "Essence of calculus",
      href: "https://www.youtube.com/playlist?list=PLZHQObOWTQDMsr9K-rj53DwVRMYO3t5Yr",
    },
    {
      title: "TIE A TIE",
      href: "https://youtu.be/yGSPPXau-nQ",
    },
    {
      title: "Marcus Aurelius: The Man Who Solved the Universe",
      href: "https://youtu.be/tv6W0Nv5ev0",
    },
    {
      title: "Inside the World's Smartest Robot Brain [VLA]",
      href: "https://youtu.be/2mrGMMmrVNE",
    },
    {
      title: "How A Single Costco Changes Its Local Economy",
      href: "https://youtu.be/ldQAZNXecBY",
    },
    {
      title: "Essence of linear algebra",
      href: "https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab",
    },
    {
      title: "Yann LeCun's $1B Bet Against LLMs",
      href: "https://youtu.be/kYkIdXwW2AE",
    },
  ],
  blogs: [
    {
      title: "What we've learned building cloud agents",
      author: "Cursor",
      date: "2026",
      href: "https://cursor.com/blog/cloud-agent-lessons",
    },
    {
      title: "Reinforcement learning is an infrastructure problem",
      author: "Modal",
      date: "2026",
      href: "https://modal.com/blog/reinforcement-learning-infrastructure-problem",
    },
    {
      title: "Introducing SWE-Check: 10x Faster Bug Detection",
      author: "Cognition",
      date: "2026",
      href: "https://cognition.ai/blog/swe-check-10x-faster",
    },
    {
      title: "Introducing SWE 1.6: Improving Model UX",
      author: "Cognition",
      date: "2026",
      href: "https://cognition.ai/blog/swe-1-6",
    },
    {
      title: "Continually improving our agent harness",
      author: "Cursor",
      date: "2026",
      href: "https://cursor.com/blog/continually-improving-agent-harness",
    },
    {
      title: "Glean Waldo: Agentic search with ~50% lower latency",
      author: "Glean",
      date: "2026",
      href: "https://www.glean.com/blog/waldo-launch",
    },
    {
      title: "How we achieved truly serverless GPUs",
      author: "Modal",
      date: "2026",
      href: "https://modal.com/blog/truly-serverless-gpus",
    },
    {
      title: "Improving Composer through real-time RL",
      author: "Cursor",
      date: "2026",
      href: "https://cursor.com/blog/real-time-rl-for-composer",
    },
    {
      title: "Kevin-32B: Multi-Turn RL for Writing CUDA Kernels",
      author: "Cognition",
      date: "2025",
      href: "https://cognition.ai/blog/kevin-32b",
    },
    {
      title: "The third era of AI software development",
      author: "Cursor",
      date: "2026",
      href: "https://cursor.com/blog/third-era",
    },
    {
      title: "The First Fully General Computer Action Model",
      author: "Standard Intelligence",
      date: "2026",
      href: "https://si.inc/posts/fdm1/",
    },
    {
      title: "Implementing a secure sandbox for local agents",
      author: "Cursor",
      date: "2026",
      href: "https://cursor.com/blog/agent-sandboxing",
    },
    {
      title: "The Potential of RLMs",
      author: "Drew Breunig",
      date: "2026",
      href: "https://www.dbreunig.com/2026/02/09/the-potential-of-rlms.html",
    },
    {
      title: "Expert data drives model performance",
      author: "Mercor",
      date: "2026",
      href: "https://www.mercor.com/blog/expert-data-drives-model-performance/",
    },
    {
      title: "Dynamic context discovery",
      author: "Cursor",
      date: "2026",
      href: "https://cursor.com/blog/dynamic-context-discovery",
    },
    {
      title: "Open-R1: A fully open reproduction of DeepSeek-R1",
      author: "Hugging Face",
      date: "2025",
      href: "https://huggingface.co/blog/open-r1",
    },
    {
      title: "The state of post-training in 2025",
      author: "Nathan Lambert",
      date: "2025",
      href: "https://www.interconnects.ai/p/the-state-of-post-training-2025",
    },
    {
      title: "Introducing SWE-grep and SWE-grep-mini",
      author: "Cognition",
      date: "2025",
      href: "https://cognition.ai/blog/swe-grep",
    },
    {
      title: "The Economy will Become an RL Environment Machine",
      author: "Mercor",
      date: "2025",
      href: "https://www.mercor.com/blog/the-economy-will-become-an-rl-environment-machine/",
    },
    {
      title: "The Wisdom of Artificial Crowds",
      author: "Drew Breunig",
      date: "2025",
      href: "https://www.dbreunig.com/2025/04/18/the-wisdom-of-artificial-crowds.html",
    },
    {
      title: "Learning to reason with LLMs",
      author: "OpenAI",
      date: "2024",
      href: "https://openai.com/index/learning-to-reason-with-llms/",
    },
    {
      title: "π0: Our First Generalist Policy",
      author: "Physical Intelligence",
      date: "2024",
      href: "https://www.pi.website/blog/pi0",
    },
    {
      title: "On Synthetic Data: How It's Improving & Shaping LLMs",
      author: "Drew Breunig",
      date: "2024",
      href: "https://www.dbreunig.com/2024/12/18/synthetic-data-the-growing-ai-perception-divide.html",
    },
    {
      title: "Reward Hacking in Reinforcement Learning",
      author: "Lilian Weng",
      date: "2024",
      href: "https://lilianweng.github.io/posts/2024-11-28-reward-hacking/",
    },
    {
      title: "The ultimate guide to RL environments",
      author: "Hugging Face",
      date: "2025",
      href: "https://huggingface.co/spaces/AdithyaSK/rl-environments-guide",
    },
    {
      title: "The Eiffel Tower Llama",
      author: "Hugging Face",
      date: "2024",
      href: "https://huggingface.co/spaces/dlouapre/eiffel-tower-llama",
    },
    {
      title: "Why Is Human Data Quality Hard?",
      author: "Lilian Weng",
      date: "2024",
      href: "https://lilianweng.github.io/posts/2024-02-05-human-data-quality/",
    },
    {
      title: "Curriculum for Reinforcement Learning",
      author: "Lilian Weng",
      date: "2020",
      href: "https://lilianweng.github.io/posts/2020-01-29-curriculum-rl/",
    },
    {
      title: "A (Long) Peek into Reinforcement Learning",
      author: "Lilian Weng",
      date: "2018",
      href: "https://lilianweng.github.io/posts/2018-02-19-rl-overview/",
    },
    {
      title: "Notes on Product Taste",
      author: "Paul Graham",
      date: "2002",
      href: "https://paulgraham.com/taste.html",
    },
    {
      title: "How to Do Great Work",
      author: "Paul Graham",
      date: "2023",
      href: "https://paulgraham.com/greatwork.html",
    },
    {
      title: "Life is Short",
      author: "Paul Graham",
      date: "2016",
      href: "https://paulgraham.com/vb.html",
    },
    {
      title: "Fast",
      author: "Patrick Collison",
      date: "2019",
      href: "https://patrickcollison.com/fast",
    },
    {
      title: "The Psychology of Money",
      author: "Morgan Housel",
      date: "2018",
      href: "https://www.collaborativefund.com/blog/the-psychology-of-money/",
    },
    {
      title: "How to Be Successful",
      author: "Sam Altman",
      date: "2019",
      href: "https://blog.samaltman.com/how-to-be-successful",
    },
    {
      title: "How to Make Wealth",
      author: "Paul Graham",
      date: "2004",
      href: "https://paulgraham.com/wealth.html",
    },
    {
      title: "Do Things that Don't Scale",
      author: "Paul Graham",
      date: "2013",
      href: "https://paulgraham.com/ds.html",
    },
  ],
};

export const THOUGHTS: ThoughtItem[] = [
  { statement: "Distribution without craft is noise." },
  { statement: "Clarity is a competitive advantage." },
  { statement: "Taste is built, not inherited." },
  { statement: "A good product should teach itself." },
  { statement: "Momentum is usually an interface problem first." },
];
