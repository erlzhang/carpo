class AddDefaultVolumeToBooks < ActiveRecord::Migration[5.1]
  def change
    add_column :books, :default_volume, :integer, null: false, default: 0
  end
end
