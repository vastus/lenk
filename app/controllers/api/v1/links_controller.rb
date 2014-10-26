module Api
  module V1
    class LinksController < ApplicationController
      def create
        list = List.find(params[:id])
        @link = Link.new(link_params)
        respond_to do |format|
          if @link.save
            list.links << @link
            format.json { render(:show, :status => :created, location: @link) }
          else
            format.json { render(:json => @link.errors, :status => :unprocessable_entity) }
          end
        end
      end

      private

      def link_params
        params.require(:link).permit(:url)
      end
    end
  end
end


