declare module '*.svg' {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>> | string;
  export default content;
}

declare module '*.scss' {
  const content: Record<string, string>;
  export default content;
}

declare module '*.png' {
  const content: string;
  export default content;
}
