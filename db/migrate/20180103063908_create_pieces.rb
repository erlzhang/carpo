class CreatePieces < ActiveRecord::Migration[5.1]
  def change
    create_table :pieces do |t|
      t.string :title, null: false, default: ""
      t.text :content
      t.integer :type, null: false, default: 0

      t.timestamps
    end
  end
end
