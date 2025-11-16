defmodule Api.Scores.Score do
  use Ecto.Schema
  import Ecto.Changeset

  @primary_key {:id, UUIDv7, autogenerate: true}

  schema "scores" do
    field :title, :string
    field :tempo, :integer

    timestamps(type: :utc_datetime)

    has_many :measures, Api.Scores.Measure
  end

  @doc false
  def changeset(score, attrs) do
    score
    |> cast(attrs, [:title, :tempo])
    |> validate_required([:title, :tempo])
  end
end
