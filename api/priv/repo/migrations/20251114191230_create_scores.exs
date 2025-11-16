defmodule Api.Repo.Migrations.CreateScores do
  use Ecto.Migration

  def change do
    create table(:scores, primary_key: false) do
      add :id, :uuid, primary_key: true, default: fragment("gen_random_uuid()")
      add :title, :string, null: false
      add :tempo, :integer, null: false

      timestamps(type: :utc_datetime)
    end

    create index(:scores, [:title])
    create index(:scores, [:tempo])
    create index(:scores, [:inserted_at])
  end
end
