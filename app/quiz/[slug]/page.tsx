
import Questions from "@/components/questions";
import { categoryOptions, domainOptions } from "@/constants";
import { redirect } from "next/navigation";

type Props = {
  params: {
    slug: string;
  }
  searchParams: {
    domain: string;
    limit: string;
  };
};

async function getData(category: string, difficulty: string, limit: string) {
  const res = await fetch(
    `https://the-trivia-api.com/api/questions?categories=${category}&limit=${limit}&type=multiple&difficulty=${difficulty}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const QuestionsPage = async ({ params, searchParams }: Props) => {
  let category = params.slug;
  let difficulty = searchParams.domain;
  let limit = searchParams.limit;

  const validateCategory = (category: string) => {
    const validCategories = categoryOptions.map((option) => option.value);
    return validCategories.includes(category);
  };

  const validateDifficulty = (difficulty: string) => {
    const validDifficulties = domainOptions.map((option) => option.value);
    return validDifficulties.includes(difficulty);
  };

  const validateLimit = (limit: string) => {
    const parsedLimit = parseInt(limit, 10);
    return !isNaN(parsedLimit) && parsedLimit >= 5 && parsedLimit <= 50;
  };

  if (
    !validateCategory(category) ||
    !validateDifficulty(difficulty) ||
    !validateLimit(limit)
  ) {
    console.error('redirecting!');
    return redirect("/");
  }
  category = "general_software_engineering";
  difficulty = "easy"
  limit = "5";

  const response = await getData(category, difficulty, limit);

  return (
    <Questions
      questions={response}
      limit={parseInt(limit, 10)}
      category={category}
    />
  );
};

export default QuestionsPage;
