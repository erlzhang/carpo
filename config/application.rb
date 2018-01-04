require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Leaf
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 5.1

    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.

    # 国际化
    # # The default locale is :en and all translations from config/locales/*.rb,yml are auto loaded.
    config.i18n.load_path += Dir[Rails.root.join('my', 'locales', '*.{rb,yml}').to_s]
    config.i18n.default_locale = :zh

    config.generators do |g|
      g.orm             :active_record
      g.template_engine :haml
      g.test_framework  false
      #g.test_framework  :test_unit, fixture: false
      #g.test_framework  :minitest, spec: false
      g.jbuilder        false
      g.stylesheets     false
      g.javascripts     false
    end
  end
end
