defmodule Api.Scores.Measure do
  use Ecto.Schema
  import Ecto.Changeset

  schema "measures" do
    @primary_key {:id, UUIDv7, autogenerate: true}
    field :index, :integer

    timestamps(type: :utc_datetime)

    belongs_to :score, Api.Scores.Score

    has_many :beats, Api.Scores.Beat
  end

  @doc false
  def changeset(measure, attrs) do
    measure
    |> cast(attrs, [:index, :scoreId])
    |> validate_required([:index, :scoreId])
  end
end
