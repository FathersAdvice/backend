import RandomWord from "random-words";

export const keyGenerateForMap = (key) => RandomWord(5).join(`_${key}`);
