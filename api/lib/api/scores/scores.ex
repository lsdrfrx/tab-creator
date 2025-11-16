defmodule Api.Scores do
  alias Api.Scores.{Score, Measure, Beat, Note, Subnote}
  alias Api.Repo

  def create_new_score(attrs) do
    %Score{}
    |> Score.changeset(attrs)
    |> Repo.insert()
  end
end
