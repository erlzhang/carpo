class CreateVolumes < ActiveRecord::Migration[5.1]
  def change
    create_table :volumes do |t|
      t.string :title, null: false, default: ""
      t.text :description
      t.integer :volume_index, null: false, default: 0
      t.references :book

      t.timestamps
    end
  end
end
