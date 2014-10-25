module Api
  module V1
    class ListsController < ApplicationController
      def show
        list = List.find(params[:id])
        @links = list.links.order("updated_at DESC")
      end
    end
  end
end

