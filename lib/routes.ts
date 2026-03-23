export const routes = {
  home: "/",
  user: {
    create: "/users/create-user",
    edit: (id: string) => `/user/${id}/edit`,
    list: "/user/list",
  },
  apiRoutes: {
    user: {
        create: "/api/users"
    }
  }
};