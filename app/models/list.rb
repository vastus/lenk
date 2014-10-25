class List < ActiveRecord::Base
  # Relations
  has_many(:listables)
  has_many(:links, :through => :listables)

  # Validations
  validates(:name,
    :uniqueness => {
      case_sensitive: false
    }
  )

  # Scopes
  # scope(:public) -> { where("public = true") }

  def self.from_name(name)
    where(:name => name).first_or_create
  end
end

