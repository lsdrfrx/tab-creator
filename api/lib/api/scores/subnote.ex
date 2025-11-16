defmodule Api.Scores.Subnote do
  use Ecto.Schema
  import Ecto.Changeset

  schema "subnotes" do
    @primary_key {:id, UUIDv7, autogenerate: true}
    field :index, :integer
    field :fret, :integer
    field :key, :string

    timestamps(type: :utc_datetime)

    belongs_to :note, Api.Scores.Note
  end

  @doc false
  def changeset(subnote, attrs) do
    subnote
    |> cast(attrs, [:index, :fret, :note, :noteId])
    |> validate_required([:index, :fret, :note, :noteId])
  end
end
