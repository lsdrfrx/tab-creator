defmodule Api.Scores.Note do
  use Ecto.Schema
  import Ecto.Changeset

  schema "notes" do
    @primary_key {:id, UUIDv7, autogenerate: true}
    field :index, :integer

    timestamps(type: :utc_datetime)

    belongs_to :note, Api.Scores.Note

    has_many :subnotes, Api.Scores.Subnote
  end

  @doc false
  def changeset(note, attrs) do
    note
    |> cast(attrs, [:index, :beatId])
    |> validate_required([:index, :beatId])
  end
end
