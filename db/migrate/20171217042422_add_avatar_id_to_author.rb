class AddAvatarIdToAuthor < ActiveRecord::Migration[5.1]
  def change
    add_column :authors, :avatar_id, :integer, null: false, default: 0
  end
end
