class CreateAuthors < ActiveRecord::Migration[5.1]
  def change
    create_table :authors do |t|
      t.string :name, null: false, default: ""
      t.string :email, null: false, default: ""
      t.text :description
      t.integer :role, null: false, default: 0

      t.timestamps
    end
  end
end
