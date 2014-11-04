module Api
  module V1
    class LinksController < ApplicationController
      before_action(:set_link, :only => [:destroy])

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

      def destroy
        @link.destroy
        respond_to do |format|
          format.json { head(:no_content) }
        end
      end

      private

      def set_link
        @link = Link.find(params[:link_id])
      end

      def link_params
        params.require(:link).permit(:url)
      end
    end
  end
end


