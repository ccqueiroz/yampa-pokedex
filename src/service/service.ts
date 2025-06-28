export interface Service<Input, Output> {
  execute(input: Input): Output;
}
