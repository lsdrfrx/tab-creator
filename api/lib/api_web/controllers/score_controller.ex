defmodule ApiWeb.ScoreController do
  use ApiWeb, :controller
  alias Api.{Repo, Scores}

  import Ecto.Query

  def getAll(conn, _) do
    json(
      conn,
      Repo.all(from s in Scores.Score, select: %{id: s.id, title: s.title, tempo: s.tempo})
    )
  end

  def getById(conn, %{"id" => id}) do
    json(conn, %{id: id})
  end

  def create(conn, score_data) do
    case Scores.create_new_score(score_data) do
      {:ok, _} ->
        conn
        |> put_status(:created)
        |> json(%{})

      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> json(changeset)
    end
  end

  def deleteById(conn, _id) do
    json(conn, %{message: "hello!"})
  end

  def updateById(conn) do
    json(conn, %{message: "hello!"})
  end
end
