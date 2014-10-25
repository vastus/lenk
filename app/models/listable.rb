class Listable < ActiveRecord::Base
  belongs_to(:list)
  belongs_to(:link)
end

