require 'test_helper'

class DemoControllerTest < ActionDispatch::IntegrationTest
  test "should get admin" do
    get demo_admin_url
    assert_response :success
  end

end
