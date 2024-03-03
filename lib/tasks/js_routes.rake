# frozen_string_literal: true

require 'js-routes'

namespace :js_routes do
  desc 'Generate js routes for webpack'
  task generate: :environment do
    file_name = File.join(Rails.root, 'app', 'javascript', 'routes', 'ApiRoutes.js')
    JsRoutes.generate!(file_name, camel_case: true)
  end
end
