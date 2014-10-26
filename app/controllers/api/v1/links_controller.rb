module Api
  module V1
    class LinksController < ApplicationController
      def create
        list = List.find(params[:id])
        @link = list.links.create(link_params)
        respond_to do |format|
          format.json { render(:show, :status => :created, location: @link) }
        end
      end

      private

      def link_params
        params.require(:link).permit(:url)
      end
    end
  end
end


