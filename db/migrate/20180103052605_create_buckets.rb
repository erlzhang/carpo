class CreateBuckets < ActiveRecord::Migration[5.1]
  def change
    create_table :buckets do |t|
      t.string :title, null: false, default: ""
      t.integer :type, null: false, default: 0

      t.timestamps
    end
  end
end
