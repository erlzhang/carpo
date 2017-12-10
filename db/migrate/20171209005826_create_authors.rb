class CreateAuthors < ActiveRecord::Migration[5.1]
  def change
    create_table :authors do |t|
      t.string :name, default: "", null: false
      t.text :introduction
      t.string :url, default: "", null: false
      t.string :file_avatar
      t.datetime :birthday
      t.integer :status, default: 0, null: false
      t.references :user

      t.timestamps
    end
  end
end
