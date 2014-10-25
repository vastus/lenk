json.array!(@links) do |link|
  json.id(link.id)
  json.url(link.url)
  json.created_at(link.created_at)
  json.updated_at(link.updated_at)
  json.time_ago(time_ago_in_words(link.updated_at))
end

