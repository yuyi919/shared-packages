import { Types } from "../..";

// type KeyWords = {
//   [K in
//     | "A"
//     | "B"
//     | "C"
//     | "D"
//     | "E"
//     | "F"
//     | "G"
//     | "H"
//     | "I"
//     | "J"
//     | "K"
//     | "L"
//     | "M"
//     | "N"
//     | "O"
//     | "P"
//     | "Q"
//     | "R"
//     | "S"
//     | "T"
//     | "U"
//     | "V"
//     | "W"
//     | "X"
//     | "Y"
//     | "Z"]: Lowercase<K>;
// };
// type UpperKey = Uppercase<keyof KeyWords>;
// type LowerKey = Lowercase<KeyWords[keyof KeyWords]>;

/**
 * @beta
 */
export type ToUpperCase<S extends string> = Uppercase<S>;
/**
 * @beta
 */
export type ToLowerCase<S extends string> = Lowercase<S>;
/**
 * @beta
 */
export type ToUpperCaseFirst<T extends string> = T extends `${infer A}${infer B}`
  ? `${ToUpperCase<A>}${B}`
  : T;
/**
 * @beta
 */
export type ToLowerCaseFirst<T extends string> = T extends `${infer A}${infer B}`
  ? `${ToLowerCase<A>}${B}`
  : T;

// type ToUpperCaseFirstA = ToUpperCaseFirst<"abc">

// type CamelCaseInner<
//   T extends string,
//   Split extends string,
//   R extends string = ""
// > = T extends `${infer A}${Split}${infer B}`
//   ? CamelCaseInner<ToUpperCaseFirst<B>, Split, `${R}${ToUpperCaseFirst<A>}`>
//   : `${R}${ToUpperCaseFirst<T>}`;

type CamelCaseInner<
  T extends string,
  Split extends string,
  Deep extends number,
  R extends string = "",
  Splited extends [string, string?] = Types.String.SplitFirst<T, Split>
> = Splited extends [string, string]
  ? Deep extends 0
    ? `${R}${T}`
    : CamelCaseInner<
        ToUpperCaseFirst<Splited[1]>,
        Split,
        Types.Number.Minus<Deep>,
        `${R}${ToUpperCaseFirst<Splited[0]>}`
      >
  : `${R}${ToUpperCaseFirst<T>}`;
/**
 * 将字符串转换为驼峰格式
 * @typeParam T - 字符串，必传
 * @typeParam Split - 分隔符，默认为 "-"
 * @typeParam Deep - 递归类型层级，默认为10，不宜过高
 * @beta
 */
export type CamelCase<
  T extends string,
  Split extends string = "-",
  Deep extends number = 10
> = T extends `${string}${Split}${string}` ? CamelCaseInner<T, Split, Deep> : ToUpperCaseFirst<T>;

// type SplitResult = CamelCase<"update:window-open-status", "-" | ":", 9>;
