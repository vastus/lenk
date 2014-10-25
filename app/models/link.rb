class Link < ActiveRecord::Base
  # Relations
  has_many(:listables)
  has_many(:lists, :through => :listables)
end

