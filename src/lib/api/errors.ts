import "server-only";

export class ApiError extends Error {
  constructor(
    message: string,
    public status = 400,
    public extra: Record<string, unknown> = {},
  ) {
    super(message);
  }
}

export function withApiErrors(handler: (request: Request) => Promise<Response>) {
  return async (request: Request) => {
    try {
      return await handler(request);
    } catch (error) {
      if (error instanceof ApiError) {
        return Response.json(
          { ...error.extra, error: error.message },
          { status: error.status },
        );
      }
      console.error(error);
      return Response.json(
        { error: "We couldn't process this image. Make sure it's a valid image file." },
        { status: 422 },
      );
    }
  };
}
