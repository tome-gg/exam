"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { categoryOptions, domainOptions } from "@/constants";

const QuizSettings = () => {
  const router = useRouter();
  const [category, setCategory] = useState<string>("");
  const [domain, setDomain] = useState<string>("");
  const [limit] = useState([10]);

  const handleQuizStart = () => {
    router.push(
      `/quiz/${category}?domain=${domain}&limit=${limit[0]}`
    );
  };

  return (
    <div className="flex flex-col justify-center items-center gap-4 md:gap-6">
      <h2 className="text-center tracking-wide text-lg md:text-xl lg:text-2xl font-bold">
        Quiz Settings
      </h2>
      <Select value={category} onValueChange={(value) => setCategory(value)}>
        <SelectTrigger className="w-full md:max-w-xs xl:max-w-md">
          <SelectValue placeholder="Learn" />
        </SelectTrigger>
        <SelectContent>
          {categoryOptions.map((category) => (
            <SelectItem value={category.value} key={category.value}>
              {category.option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select
        value={domain}
        onValueChange={(value) => setDomain(value)}
      >
        <SelectTrigger className="w-full md:max-w-xs xl:max-w-md">
          <SelectValue placeholder="Learn it from" />
        </SelectTrigger>
        <SelectContent>
          {domainOptions.map((difficulty) => (
            <SelectItem value={difficulty.value} key={difficulty.value}>
              {difficulty.option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <p className="text-xs lg:text-sm font-semibold">
        Total Questions: {limit[0]}
      </p>
      <div className="grid grid-cols-auto grid-flow-col gap-4 align-center">
        <Button>
          Log in
        </Button>
        <Button disabled={!domain || !category} onClick={handleQuizStart}>
          Start Quiz
        </Button>
      </div>
    </div>
  );
};

export default QuizSettings;
