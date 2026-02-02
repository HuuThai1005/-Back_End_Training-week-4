export function fakeAuth(role: "ADMIN" | "USER") {
  return (req: any, res: any, next: any) => {
    req.user = {
      id: 27,
      email: "admin@gmail.com",
      role,
    };
    next();
  };
}