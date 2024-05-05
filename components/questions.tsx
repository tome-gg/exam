"use client";

import { Progress } from "@/components/ui/progress";
import { alphabeticNumeral, showCategory } from "@/constants";
import useModalStore from "@/hooks/useModalStore";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import Image from "next/image";
import { IoCloseSharp } from "react-icons/io5";
import { FaHeart, FaInfoCircle, FaHandsHelping, FaThumbsUp,  } from "react-icons/fa";
import { GoReport } from "react-icons/go";
import { FaShareFromSquare } from 'react-icons/fa6';
import * as HoverCard from '@radix-ui/react-hover-card';



type Props = {
  questions: {
    category: string;
    id: string;
    correctAnswer: string;
    incorrectAnswers: string[];
    question: string;
    tags: string[];
    type: string;
    difficulty: string;
    regions: [];
    isNiche: boolean;
  }[];
  limit: number;
  category: string;
};

const Questions = ({ questions, limit, category }: Props) => {
  const [curr, setCurr] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [selected, setSelected] = useState<string>("");
  const [progressValue, setProgressValue] = useState(0);
  const [score, setScore] = useState(0);
  const { onOpen, isOpen } = useModalStore();

  const handleShuffle = (correctAnswer: string, incorrectAnswers: string[]) => {
    const shuffledAnswers = [...incorrectAnswers];

    shuffledAnswers.sort(() => Math.random() - 0.5);
    const randomIndex = Math.floor(
      Math.random() * (shuffledAnswers.length + 1)
    );
    shuffledAnswers.splice(randomIndex, 0, correctAnswer);

    return shuffledAnswers;
  };

  const handleCheck = (answer: string) => {
    setSelected(answer);
    if (answer === questions[curr].correctAnswer) setScore(score + 1);
  };

  const handleSelect = (i: string) => {
    if (selected === i && selected === questions[curr].correctAnswer)
      return "correct";
    else if (selected === i && selected !== questions[curr].correctAnswer)
      return "incorrect";
    else if (i === questions[curr].correctAnswer) return "correct";
  };

  const handleNext = () => {
    setCurr((curr) => curr + 1);
    setSelected("");
  };

  const handleQuit = () => {
    onOpen("quitQuiz");
  };

  const handleShowResult = () => {
    if (!isOpen) {
      onOpen("showResults", {
        score,
        limit,
      });
    }
  };

  useEffect(() => {
    if (questions?.length >= 5) {
      setAnswers(
        handleShuffle(
          questions[curr].correctAnswer,
          questions[curr].incorrectAnswers
        )
      );
    }
    setProgressValue((100 / limit) * (curr + 1));
  }, [curr, questions]);


  // setTimeout(() => {
  //   handleShowResult();
  // }, 0);

  const QuestionHoverInfo = () => {
    return (
      <HoverCard.Root>
      <HoverCard.Trigger asChild>
        <span
          className="cursor-pointer text-2xl text-gray-400 hidden sm:block my-auto"
          rel="noreferrer noopener"
        >
          <FaInfoCircle />
        </span>
      </HoverCard.Trigger>
      <HoverCard.Portal>
        <HoverCard.Content className="HoverCardContent m-4" sideOffset={5} side="right">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
            {/* <img
              className="h-12 w-12 rounded-full"
              src="/logo-small.png"
              alt="TheGamingClassroom logo"
            /> */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
              <h4>Question statistics</h4>
              <p className="text-sm text-gray-400">You are at question 5 of 15 (33%).</p>
              <p className="text-sm text-gray-400">47 learners answered this question correctly the first time.</p>
              <p className="text-sm text-gray-400">Learners usually take 40 seconds to answer this correctly.</p>
              
              <h4>Your Cohort's performance</h4>
              <p className="text-sm text-gray-400">Every person in your cohort has answered this question correctly.</p>
              <p className="text-sm text-gray-400">Persons in your cohort usually take 37 seconds to answer this correctly.</p>
              <a className="text-xs text-white bg-gray-400 w-max rounded p-2 cursor-pointer flex flex-row"><FaShareFromSquare className="mr-1 text-base" /> Share</a>
              <Separator />
              <p className="text-xs text-gray-400">5 Peers available for assistance.</p>
              <a className="text-xs text-white bg-gray-400 w-max rounded p-2 cursor-pointer flex flex-row"><FaHandsHelping className="mr-1 text-base" /> Ask for help</a>
              <Separator />
              <p className="text-xs text-gray-400">Do you have feedback on the question?</p>
              <div style={{ display: 'flex', flexDirection: 'row', gap: 5 }}>
                <a className="text-xs text-white bg-gray-400 w-max rounded py-2 px-4 inline cursor-pointer flex flex-row"><FaThumbsUp className="mr-1" /> Like</a>
                <a className="text-xs text-white bg-gray-400 w-max rounded p-2 inline cursor-pointer flex flex-row"><GoReport className="mr-1 text-base" /> Give feedback</a>
              </div>
            </div>
          </div>

          <HoverCard.Arrow className="HoverCardArrow" />
        </HoverCard.Content>
      </HoverCard.Portal>
    </HoverCard.Root>
    )
  }

  return (
    <div className="wrapper flex flex-col">
      <div className="bg-white p-4 shadow-md w-full md:w-[80%] lg:w-[70%] max-w-5xl rounded-md">
        <div className="w-full flex flex-row pb-4 align-center justify-center h-[80px]">
          <Image
            src={"/logo-small.png"}
            alt="banner-image"
            priority
            width={64}
            height={64}
            className="object-cover object-center mr-4"
          />
          <div className="w-full bg-gray-300 p-4 rounded text-white text-sm sm:text-base">
            Your advertisement here!
          </div>
          <div className="w-[25px] ml-4 mb-2 icon text-2xl cursor-pointer">
          <IoCloseSharp onClick={handleQuit} />
          </div>
        </div>
        <Separator className="mb-3" />
        <Progress value={progressValue} />
        <div className="flex justify-between flex-col sm:flex-row text-sm sm:text-base py-5 px-2 font-bold text-md align-center jutify-center">
          <QuestionHoverInfo />
          <p className="ml-4 mb-4 sm:mb-auto sm:my-auto">{showCategory(category)}</p>
          {/* <p className="text-gray-400">Time left: Unknown</p> */}
          <div className="relative p-2 bg-gray-100 rounded-lg text-sm w-fit ml-auto">
            <div className="absolute w-fit h-fit -top-1.5 -right-1.5">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-500"></span>
              </span>
            </div>
            Score: {score}
          </div>
          
        </div>
        <div className="flex flex-col min-h-[45vh] p-4 gap-4 w-full">
          {questions.length > 0 && (
            <>
              <h2 className="text-2xl text-center font-medium">{`Q${
                curr + 1
              }. ${questions[curr]?.question}`}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-auto gap-4">
              {answers?.map((answer, i) => (
                <button
                  key={i}
                  className={`option ${selected && handleSelect(answer)}`}
                  disabled={!!selected}
                  onClick={() => handleCheck(answer)}
                >
                  {alphabeticNumeral(i)}
                  {answer}
                </button>
              ))}
              </div>
              <div className="flex mt-5 md:justify-between md:flex-row flex-col gap-4 md:gap-0 mx-auto max-w-xs w-full md:w-fit">
                <Button
                  disabled={!selected}
                  onClick={() =>
                    questions.length === curr + 1
                      ? handleShowResult()
                      : handleNext()
                  }
                >
                  {questions.length - 1 != curr
                    ? "Next Question"
                    : "Show Results"}
                </Button>
              </div>
            </>
          )}
        </div>
        <div className="flex flex-col py-5 px-2 font-bold text-md text-gray-300 text-xs">
          <p className="text-gray-400">Quiz Author: Your YouTube channel</p>
          <p className="text-gray-400 mb-4">Quiz Editor: John Smith</p>
          <p className="text-gray-400">By participating in this quiz, you contribute and support innovation in education: rewarding teachers, educators, coaches, peer reviewers, and mentors!</p>
        </div>
      </div>
      <span className="text-xs text-gray-400 my-2 sm:absolute bottom-4 right-4">Made with <FaHeart className="inline" /> by <a className="cursor-pointer underline" href="https://www.tiktok.com/@thegamingclassroom">TGC</a> in San Francisco</span>
    </div>
  );
};

export default Questions;
