server 'lespandas.fr', user: 'deploy', roles: %w(app db web)

set :ssh_options, {
  forward_agent: true,
  port: 50102
}
