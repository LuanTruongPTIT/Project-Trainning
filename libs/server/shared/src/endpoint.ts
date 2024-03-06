import { RequestHandler, Request, Response } from 'express';

type EndpointResolverArgs<TContext, TInput> = {
  input: TInput;
  ctx: TContext;
  req: Request;
};

type EndpointOnSuccess = <TOutput>(
  req: Request,
  res: Response,
  output: TOutput
) => any;
type EndpointSchema<TInput = unknown> = {
  parse: (input: any) => TInput;
};

type EndpointWithInput<TContext, TInput, TOutput> = {
  input: EndpointSchema<TInput>;
  authorize?(
    args: EndpointResolverArgs<TContext, TInput>
  ): boolean | Promise<boolean>;
  resolve(args: EndpointResolverArgs<TContext, TInput>): Promise<TOutput>;
  onSuccess?: EndpointOnSuccess;
};
type EndpointWithoutInput<TContext, TOutput> = Omit<
  EndpointWithInput<TContext, undefined, TOutput>,
  'input'
>;

export class EndpointFactory<TContext> {
  constructor(
    private readonly options: {
      // createContext: (
      //   req: Request,
      //   res: Response
      // ) => TContext | Promise<TContext>;
      createContext: (req: Request, res?: Response) => void;
      onSuccess?: EndpointOnSuccess;
    }
  ) {}
  create<TInput, TOutput>(
    opts: EndpointWithInput<TContext, TInput, TOutput>
  ): RequestHandler;
  create<TOutput>(
    opts: EndpointWithoutInput<TContext, TOutput>
  ): RequestHandler;
  create<TInput, TOutput>(
    opts:
      | EndpointWithInput<TContext, TInput, TOutput>
      | EndpointWithoutInput<TContext, TOutput>
  ): RequestHandler {
    const { authorize, resolve } = opts;
    console.log('resolve', JSON.stringify(resolve));
    const input = 'input' in opts ? opts.input : undefined;
    return async (req, res, next) => {
      let inputData: TInput | undefined;
      try {
        inputData = input?.parse({ ...req.query, ...req.body });
        console.log('inputData', inputData);
      } catch (err) {
        console.error('input parse error', err);
      }
    };
  }
}
