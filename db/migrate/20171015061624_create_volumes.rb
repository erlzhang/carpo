class CreateVolumes < ActiveRecord::Migration[5.1]
  def change
    create_table :volumes do |t|
      t.string :title, null: false, default: ""
      t.text :description
      t.integer :number, null: false, default: 0
      t.integer :book_id

      t.timestamps
    end
  end
end
