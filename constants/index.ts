export const categoryOptions = [
  {
    value: "general_software_engineering",
    option: "Learn: General topics of Software Engineering",
  },
  {
    value: "basic_programming",
    option: "Learn: Basic Programming",
  },
  {
    value: "design_patterns",
    option: "Learn: Design Patterns",
  },
  {
    value: "data_structures_and_algorithms",
    option: "Learn: Data Structures and Algorithms",
  },
  {
    value: "general_mathematics",
    option: "Learn: General topics of Mathematics",
  },
  {
    value: "calculus",
    option: "Learn: Calculus",
  },
  {
    value: "statistics",
    option: "Learn: Statistics",
  },
  {
    value: "combinatorics",
    option: "Learn: Combinatorics- Probabilities, Permutations, and Combinations",
  },
  {
    value: "general_business_administration",
    option: "Learn: General topics of Business Administration",
  },
  
  {
    value: "basic_economics",
    option: "Learn: Basic Economics",
  },
  {
    value: "basic_finance",
    option: "Learn: Basic Finance",
  },
  {
    value: "investment_and_risk",
    option: "Learn: Investment and Risk",
  },
];

export const domainOptions = [
  {
    value: "haikyu",
    option: "From Anime: Haikyu",
  },
  {
    value: "dota_2",
    option: "From Video Games: DotA 2",
  },
];

export const alphabeticNumeral = (index: number) => {
  const asciiCode = index + 65;
  const letter = String.fromCharCode(asciiCode);
  return letter + ". ";
};

export const showCategory = (category: string) => {
  let categoryName = categoryOptions.find((o) => o.value === category)?.option;
  if (categoryName) return categoryName;
  return 'Category Unknown';
};
