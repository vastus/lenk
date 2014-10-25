namespace :links do
  desc("Move delistable links under 'global' list")
  task(:move_delistable_links_under_global => :environment) do
    global_list = List.where(:name => "global").first_or_initialize
    global_list.save!
    Link.find_each(:batch_size => 100) do |link|
      link.lists << global_list if link.lists.empty?
    end
  end
end

