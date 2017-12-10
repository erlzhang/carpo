require 'test_helper'

class Admin::AuthorControllerTest < ActionDispatch::IntegrationTest
  test "should get new" do
    get admin_author_new_url
    assert_response :success
  end

  test "should get edit" do
    get admin_author_edit_url
    assert_response :success
  end

end
