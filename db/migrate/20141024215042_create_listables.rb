class CreateListables < ActiveRecord::Migration
  def change
    create_table(:listables) do |t|
      t.integer(:list_id)
      t.integer(:link_id)
      t.timestamps(:null => false)
    end

    add_index(:listables, [:list_id, :link_id])
  end
end

