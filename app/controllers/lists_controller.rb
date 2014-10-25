class ListsController < ApplicationController
  def index
    @list = List.new
    @global_list = List.find_by(:name => "global")
    @global_links = @global_list.links.order("updated_at DESC").limit(10)
  end

  def show
    @list = List.find(params[:id])
  end

  def create
    @list = List.from_name(list_params[:name])
    redirect_to(list_path(@list))
  end

  private

  def list_params
    params.require(:list).permit(:name)
  end
end

