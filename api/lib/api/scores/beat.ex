defmodule Api.Scores.Beat do
  use Ecto.Schema
  import Ecto.Changeset

  schema "beats" do
    @primary_key {:id, UUIDv7, autogenerate: true}
    field :index, :integer
    field :duration, :string

    timestamps(type: :utc_datetime)

    belongs_to :measure, Api.Scores.Measure

    has_many :notes, Api.Scores.Note
  end

  @doc false
  def changeset(beat, attrs) do
    beat
    |> cast(attrs, [:index, :duration, :measureId])
    |> validate_required([:index, :duration, :measureId])
  end
end
