defmodule ApiWeb.Router do
  use ApiWeb, :router

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/score", ApiWeb do
    pipe_through :api
    get "/", ScoreController, :getAll
    get "/:id", ScoreController, :getById
    post "/new", ScoreController, :create
    patch "/:id", ScoreController, :updateById
    put "/:id", ScoreController, :updateById
    delete "/:id", ScoreController, :deleteById
  end
end
