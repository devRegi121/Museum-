using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MuseumAPI.Migrations
{
    /// <inheritdoc />
    public partial class UpdateGiftInformation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "price",
                table: "Gifts",
                newName: "Price");

            migrationBuilder.AddColumn<string>(
                name: "Url",
                table: "Gifts",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Url",
                table: "Gifts");

            migrationBuilder.RenameColumn(
                name: "Price",
                table: "Gifts",
                newName: "price");
        }
    }
}
