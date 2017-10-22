class AddCurrentVolumeIndexToBooks < ActiveRecord::Migration[5.1]
  def change
    add_column :books, :current_volume_index, :integer, null: false, default: 0
  end
end
