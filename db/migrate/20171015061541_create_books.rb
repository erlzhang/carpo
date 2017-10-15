class CreateBooks < ActiveRecord::Migration[5.1]
  def change
    create_table :books do |t|
      t.string :title, null: false, default: ""
      t.text :description
      t.integer :status, null: false, default: 0
      t.integer :openess, null:false, default: 0

      t.timestamps
    end
  end
end
