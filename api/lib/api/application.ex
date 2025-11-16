defmodule Api.Application do
  @moduledoc false

  use Application

  @impl true
  def start(_type, _args) do
    children = [
      ApiWeb.Telemetry,
      Api.Repo,
      {DNSCluster, query: Application.get_env(:api, :dns_cluster_query) || :ignore},
      {Phoenix.PubSub, name: Api.PubSub},
      # Start a worker by calling: Api.Worker.start_link(arg)
      # {Api.Worker, arg},
      # Start to serve requests, typically the last entry
      ApiWeb.Endpoint
    ]

    opts = [strategy: :one_for_one, name: Api.Supervisor]
    Supervisor.start_link(children, opts)
  end

  @impl true
  def config_change(changed, _new, removed) do
    ApiWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
