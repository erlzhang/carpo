json.respond @data["respond"]
json.message @data["message"]
if @data["respond"]
  json.id @data["id"]
  json.url admin_book_volume_path(@book, @data["id"])
end
