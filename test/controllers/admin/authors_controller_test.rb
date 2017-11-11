require 'test_helper'

class Admin::AuthorsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get admin_authors_index_url
    assert_response :success
  end

  test "should get show" do
    get admin_authors_show_url
    assert_response :success
  end

  test "should get new" do
    get admin_authors_new_url
    assert_response :success
  end

  test "should get edit" do
    get admin_authors_edit_url
    assert_response :success
  end

end
